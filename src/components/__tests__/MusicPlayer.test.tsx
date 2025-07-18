import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import MusicPlayer from '../MusicPlayer'

describe('MusicPlayer', () => {
    it('renders loading skeleton initially', () => {
        render(<MusicPlayer />)
        expect(screen.getByTestId('loading-skeleton')).toBeInTheDocument()
    })

    it('renders playlist when loaded', async () => {
        render(<MusicPlayer />)
        // Wait for playlist to load
        await screen.findByText('Playlist')
        expect(screen.getByText('Playlist')).toBeInTheDocument()
    })
}) 