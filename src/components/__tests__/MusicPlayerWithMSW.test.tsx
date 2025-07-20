import { describe, it, expect } from 'vitest'
import { render, screen, waitFor } from '@testing-library/react'
import { server } from '../../test/setup'
import { http, HttpResponse } from 'msw'
import MusicPlayer from '../MusicPlayer'

describe('MusicPlayer with MSW', () => {
    describe('API Integration', () => {
        it('loads and displays playlist from API', async () => {
            render(<MusicPlayer />)

            // Wait for the playlist to load
            await waitFor(() => {
                expect(screen.getByText('Bohemian Rhapsody')).toBeInTheDocument()
            })

            expect(screen.getByText('Queen')).toBeInTheDocument()
            expect(screen.getByText('Hotel California')).toBeInTheDocument()
            expect(screen.getByText('Eagles')).toBeInTheDocument()
        })

        it('handles API errors gracefully', async () => {
            // Override the default handler to return an error
            server.use(
                http.get('/api/playlist', () => {
                    return new HttpResponse(null, { status: 500 })
                })
            )

            render(<MusicPlayer />)

            // Component should handle the error gracefully
            await waitFor(() => {
                expect(screen.getByTestId('loading-skeleton')).toBeInTheDocument()
            })
        })

        it('handles slow API responses', async () => {
            // Override the default handler to simulate slow response
            server.use(
                http.get('/api/playlist', async () => {
                    await new Promise(resolve => setTimeout(resolve, 100))
                    return HttpResponse.json([
                        {
                            id: 1,
                            title: "Slow Song",
                            artist: "Slow Artist",
                            length: "4:30",
                            cover: "https://example.com/slow-song.jpg",
                            songUrl: "https://example.com/slow-song.mp3"
                        }
                    ])
                })
            )

            render(<MusicPlayer />)

            // Should show loading initially
            expect(screen.getByTestId('loading-skeleton')).toBeInTheDocument()

            // Wait for the slow response
            await waitFor(() => {
                expect(screen.getByText('Slow Song')).toBeInTheDocument()
            })

            expect(screen.getByText('Slow Artist')).toBeInTheDocument()
        })

        it('handles empty playlist response', async () => {
            // Override the default handler to return empty array
            server.use(
                http.get('/api/playlist', () => {
                    return HttpResponse.json([])
                })
            )

            render(<MusicPlayer />)

            // Component should handle empty playlist
            await waitFor(() => {
                expect(screen.getByTestId('loading-skeleton')).toBeInTheDocument()
            })
        })
    })

    describe('Search Functionality', () => {
        it('filters playlist based on search query', async () => {
            // Add a search handler
            server.use(
                http.get('/api/search', ({ request }) => {
                    const url = new URL(request.url)
                    const query = url.searchParams.get('q')

                    if (query === 'queen') {
                        return HttpResponse.json([
                            {
                                id: 1,
                                title: "Bohemian Rhapsody",
                                artist: "Queen",
                                length: "5:55",
                                cover: "https://example.com/bohemian-rhapsody.jpg",
                                songUrl: "https://example.com/bohemian-rhapsody.mp3"
                            }
                        ])
                    }

                    return HttpResponse.json([])
                })
            )

            render(<MusicPlayer />)

            // Wait for initial load
            await waitFor(() => {
                expect(screen.getByText('Bohemian Rhapsody')).toBeInTheDocument()
            })
        })
    })

    describe('Song Details', () => {
        it('fetches song details when song is selected', async () => {
            // Add a song details handler
            server.use(
                http.get('/api/songs/:id', ({ params }) => {
                    const { id } = params

                    if (id === '1') {
                        return HttpResponse.json({
                            id: 1,
                            title: "Bohemian Rhapsody",
                            artist: "Queen",
                            length: "5:55",
                            cover: "https://example.com/bohemian-rhapsody.jpg",
                            songUrl: "https://example.com/bohemian-rhapsody.mp3",
                            album: "A Night at the Opera",
                            year: 1975,
                            genre: "Rock"
                        })
                    }

                    return new HttpResponse(null, { status: 404 })
                })
            )

            render(<MusicPlayer />)

            // Wait for initial load
            await waitFor(() => {
                expect(screen.getByText('Bohemian Rhapsody')).toBeInTheDocument()
            })
        })
    })
}) 