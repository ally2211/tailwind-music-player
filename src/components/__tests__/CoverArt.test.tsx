import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen, fireEvent, act } from '@testing-library/react'
import CoverArt from '../CoverArt'

describe('CoverArt', () => {
    const mockOnClick = vi.fn()

    beforeEach(() => {
        vi.clearAllMocks()
    })

    describe('Loading State', () => {
        it('renders placeholder image when loading is true', () => {
            render(<CoverArt cover="https://example.com/cover.jpg" loading={true} />)

            const img = screen.getByAltText('Cover Art')
            expect(img).toBeInTheDocument()
            expect(img).toHaveAttribute('src', expect.stringContaining('data:image/svg+xml'))
        })

        it('renders placeholder image when loading is true regardless of cover URL', () => {
            render(<CoverArt cover="" loading={true} />)

            const img = screen.getByAltText('Cover Art')
            expect(img).toBeInTheDocument()
            expect(img).toHaveAttribute('src', expect.stringContaining('data:image/svg+xml'))
        })
    })

    describe('Loaded State', () => {
        it('renders cover image when loading is false', () => {
            const coverUrl = 'https://example.com/cover.jpg'
            render(<CoverArt cover={coverUrl} loading={false} />)

            const img = screen.getByAltText('Cover Art')
            expect(img).toBeInTheDocument()
            expect(img).toHaveAttribute('src', coverUrl)
        })

        it('renders cover image with empty string when loading is false', () => {
            render(<CoverArt cover="" loading={false} />)

            const img = screen.getByAltText('Cover Art')
            expect(img).toBeInTheDocument()
            // When cover is empty string, src becomes null in the DOM
            expect(img).not.toHaveAttribute('src')
        })

        it('renders cover image with long URL when loading is false', () => {
            const longCoverUrl = 'https://utfs.io/f/E9fJnaKtTy1bOclGsk1hB7xMLwUVFDiXypZukQrcnYbgdEv6'
            render(<CoverArt cover={longCoverUrl} loading={false} />)

            const img = screen.getByAltText('Cover Art')
            expect(img).toBeInTheDocument()
            expect(img).toHaveAttribute('src', longCoverUrl)
        })
    })

    describe('Click Handler', () => {
        it('calls onClick when provided and image is clicked', () => {
            render(<CoverArt cover="https://example.com/cover.jpg" loading={false} onClick={mockOnClick} />)

            const img = screen.getByAltText('Cover Art')
            act(() => {
                fireEvent.click(img)
            })

            expect(mockOnClick).toHaveBeenCalledTimes(1)
        })

        it('calls onClick when provided and container is clicked', () => {
            render(<CoverArt cover="https://example.com/cover.jpg" loading={false} onClick={mockOnClick} />)

            const container = screen.getByAltText('Cover Art').parentElement
            act(() => {
                fireEvent.click(container!)
            })

            expect(mockOnClick).toHaveBeenCalledTimes(1)
        })

        it('does not call onClick when not provided', () => {
            render(<CoverArt cover="https://example.com/cover.jpg" loading={false} />)

            const img = screen.getByAltText('Cover Art')
            act(() => {
                fireEvent.click(img)
            })

            expect(mockOnClick).not.toHaveBeenCalled()
        })

        it('calls onClick when loading is true and image is clicked', () => {
            render(<CoverArt cover="https://example.com/cover.jpg" loading={true} onClick={mockOnClick} />)

            const img = screen.getByAltText('Cover Art')
            act(() => {
                fireEvent.click(img)
            })

            expect(mockOnClick).toHaveBeenCalledTimes(1)
        })
    })

    describe('Styling', () => {
        it('has correct container dimensions', () => {
            render(<CoverArt cover="https://example.com/cover.jpg" loading={false} />)

            const container = screen.getByAltText('Cover Art').parentElement
            expect(container).toHaveStyle({ width: '400px', height: '400px' })
        })

        it('has correct image styling', () => {
            render(<CoverArt cover="https://example.com/cover.jpg" loading={false} />)

            const img = screen.getByAltText('Cover Art')
            expect(img).toHaveStyle({
                width: '100%',
                height: '100%',
                objectFit: 'cover'
            })
        })

        it('has correct styling in loading state', () => {
            render(<CoverArt cover="https://example.com/cover.jpg" loading={true} />)

            const container = screen.getByAltText('Cover Art').parentElement
            expect(container).toHaveStyle({ width: '400px', height: '400px' })

            const img = screen.getByAltText('Cover Art')
            expect(img).toHaveStyle({
                width: '100%',
                height: '100%',
                objectFit: 'cover'
            })
        })
    })

    describe('Edge Cases', () => {
        it('handles very long cover URLs', () => {
            const veryLongUrl = 'https://example.com/very/long/url/with/many/segments/and/parameters?param1=value1&param2=value2&param3=value3&param4=value4&param5=value5'
            render(<CoverArt cover={veryLongUrl} loading={false} />)

            const img = screen.getByAltText('Cover Art')
            expect(img).toBeInTheDocument()
            expect(img).toHaveAttribute('src', veryLongUrl)
        })

        it('handles special characters in cover URL', () => {
            const specialUrl = 'https://example.com/cover%20with%20spaces.jpg'
            render(<CoverArt cover={specialUrl} loading={false} />)

            const img = screen.getByAltText('Cover Art')
            expect(img).toBeInTheDocument()
            expect(img).toHaveAttribute('src', specialUrl)
        })

        it('handles data URLs', () => {
            const dataUrl = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCI+PC9zdmc+'
            render(<CoverArt cover={dataUrl} loading={false} />)

            const img = screen.getByAltText('Cover Art')
            expect(img).toBeInTheDocument()
            expect(img).toHaveAttribute('src', dataUrl)
        })
    })

    describe('Accessibility', () => {
        it('has correct alt text', () => {
            render(<CoverArt cover="https://example.com/cover.jpg" loading={false} />)

            const img = screen.getByAltText('Cover Art')
            expect(img).toBeInTheDocument()
        })

        it('has correct alt text in loading state', () => {
            render(<CoverArt cover="https://example.com/cover.jpg" loading={true} />)

            const img = screen.getByAltText('Cover Art')
            expect(img).toBeInTheDocument()
        })
    })
}) 