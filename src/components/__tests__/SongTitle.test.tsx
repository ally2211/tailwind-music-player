import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import SongTitle from '../SongTitle'

describe('SongTitle', () => {
    describe('Rendering', () => {
        it('renders title and author when provided', () => {
            render(<SongTitle title="Test Song" author="Test Artist" />)

            expect(screen.getByText('Test Song')).toBeInTheDocument()
            expect(screen.getByText('Test Artist')).toBeInTheDocument()
        })

        it('renders with default className when not provided', () => {
            render(<SongTitle title="Test Song" author="Test Artist" />)

            // Get the container div (parent of the title div)
            const container = screen.getByText('Test Song').closest('div')?.parentElement
            expect(container).toHaveClass('space-y-1')
        })

        it('renders with custom className when provided', () => {
            render(<SongTitle title="Test Song" author="Test Artist" className="custom-class" />)

            // Get the container div (parent of the title div)
            const container = screen.getByText('Test Song').closest('div')?.parentElement
            expect(container).toHaveClass('space-y-1', 'custom-class')
        })
    })



    describe('Content', () => {
        it('renders with long title', () => {
            const longTitle = 'This is a very long song title that might wrap to multiple lines and contain many words'

            render(<SongTitle title={longTitle} author="Test Artist" />)

            expect(screen.getByText(longTitle)).toBeInTheDocument()
            expect(screen.getByText('Test Artist')).toBeInTheDocument()
        })

        it('renders with long author name', () => {
            const longAuthor = 'This is a very long artist name that might also wrap to multiple lines'

            render(<SongTitle title="Test Song" author={longAuthor} />)

            expect(screen.getByText('Test Song')).toBeInTheDocument()
            expect(screen.getByText(longAuthor)).toBeInTheDocument()
        })

        it('renders with special characters in title', () => {
            render(<SongTitle title="Song & Title (feat. Guest)" author="Test Artist" />)

            expect(screen.getByText('Song & Title (feat. Guest)')).toBeInTheDocument()
            expect(screen.getByText('Test Artist')).toBeInTheDocument()
        })

        it('renders with special characters in author', () => {
            render(<SongTitle title="Test Song" author="Artist (feat. Guest) & Co." />)

            expect(screen.getByText('Test Song')).toBeInTheDocument()
            expect(screen.getByText('Artist (feat. Guest) & Co.')).toBeInTheDocument()
        })
    })



    describe('Edge Cases', () => {
        it('handles numbers in title and author', () => {
            render(<SongTitle title="Song 123" author="Artist 456" />)

            expect(screen.getByText('Song 123')).toBeInTheDocument()
            expect(screen.getByText('Artist 456')).toBeInTheDocument()
        })

        it('handles unicode characters in title and author', () => {
            render(<SongTitle title="Søng Tïtle" author="Årtist Nåme" />)

            expect(screen.getByText('Søng Tïtle')).toBeInTheDocument()
            expect(screen.getByText('Årtist Nåme')).toBeInTheDocument()
        })
    })

    describe('Props', () => {
        it('renders with all props provided', () => {
            render(<SongTitle title="Test Song" author="Test Artist" className="custom-class" />)

            expect(screen.getByText('Test Song')).toBeInTheDocument()
            expect(screen.getByText('Test Artist')).toBeInTheDocument()

            // Get the container div (parent of the title div)
            const container = screen.getByText('Test Song').closest('div')?.parentElement
            expect(container).toHaveClass('custom-class')
        })

        it('renders with minimal props', () => {
            render(<SongTitle title="Test Song" author="Test Artist" />)

            expect(screen.getByText('Test Song')).toBeInTheDocument()
            expect(screen.getByText('Test Artist')).toBeInTheDocument()
        })
    })

    describe('Accessibility', () => {
        it('has semantic structure with title and author', () => {
            render(<SongTitle title="Test Song" author="Test Artist" />)

            const title = screen.getByText('Test Song')
            const author = screen.getByText('Test Artist')

            expect(title).toBeInTheDocument()
            expect(author).toBeInTheDocument()
            expect(title.parentElement).toContainElement(author)
        })
    })
}) 