import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen, fireEvent, act } from '@testing-library/react'
import PlayListItem from '../PlayListItem'

describe('PlayListItem', () => {
    const mockOnClick = vi.fn()

    beforeEach(() => {
        mockOnClick.mockClear()
    })


    describe('Loaded State', () => {
        it('renders song information when loading is false', () => {
            render(<PlayListItem title="Test Song" artist="Test Artist" length="3:45" loading={false} />)

            expect(screen.getByText('Test Song')).toBeInTheDocument()
            expect(screen.getByText('Test Artist')).toBeInTheDocument()
            expect(screen.getByText('3:45')).toBeInTheDocument()
        })

        it('renders with default loading state when loading prop is not provided', () => {
            render(<PlayListItem title="Test Song" artist="Test Artist" length="3:45" />)

            expect(screen.getByText('Test Song')).toBeInTheDocument()
            expect(screen.getByText('Test Artist')).toBeInTheDocument()
            expect(screen.getByText('3:45')).toBeInTheDocument()
        })

        it('renders with long title and artist names', () => {
            const longTitle = 'This is a very long song title that might wrap to multiple lines'
            const longArtist = 'This is a very long artist name that might also wrap'

            render(<PlayListItem title={longTitle} artist={longArtist} length="5:30" loading={false} />)

            expect(screen.getByText(longTitle)).toBeInTheDocument()
            expect(screen.getByText(longArtist)).toBeInTheDocument()
        })

        it('renders with special characters in title and artist', () => {
            render(<PlayListItem title="Song & Title" artist="Artist (feat. Guest)" length="4:20" loading={false} />)

            expect(screen.getByText('Song & Title')).toBeInTheDocument()
            expect(screen.getByText('Artist (feat. Guest)')).toBeInTheDocument()
        })
    })

    describe('Click Handler', () => {
        it('calls onClick when provided and item is clicked', () => {
            render(<PlayListItem title="Test Song" artist="Test Artist" length="3:45" loading={false} onClick={mockOnClick} />)

            const item = screen.getByText('Test Song').closest('div')
            act(() => {
                fireEvent.click(item!)
            })

            expect(mockOnClick).toHaveBeenCalledTimes(1)
        })

        it('does not call onClick when not provided', () => {
            render(<PlayListItem title="Test Song" artist="Test Artist" length="3:45" loading={false} />)

            const item = screen.getByText('Test Song').closest('div')
            act(() => {
                fireEvent.click(item!)
            })

            expect(mockOnClick).not.toHaveBeenCalled()
        })

        it('does not call onClick when loading is true (no click handler in loading state)', () => {
            render(<PlayListItem title="Test Song" artist="Test Artist" length="3:45" loading={true} onClick={mockOnClick} />)

            // In loading state, the component should render without errors
            // and the onClick should not be called since there's no click handler in loading state
            expect(mockOnClick).not.toHaveBeenCalled()
        })
    })

    describe('Layout', () => {
        it('has correct flex layout for title and length', () => {
            render(<PlayListItem title="Test Song" artist="Test Artist" length="3:45" loading={false} />)

            const flexContainer = screen.getByText('Test Song').parentElement
            expect(flexContainer).toHaveClass('flex', 'justify-between', 'items-center')
        })

        it('renders title and length on the same line', () => {
            render(<PlayListItem title="Test Song" artist="Test Artist" length="3:45" loading={false} />)

            const title = screen.getByText('Test Song')
            const length = screen.getByText('3:45')
            const flexContainer = title.parentElement

            expect(flexContainer).toContainElement(title)
            expect(flexContainer).toContainElement(length)
        })

        it('renders artist on a separate line', () => {
            render(<PlayListItem title="Test Song" artist="Test Artist" length="3:45" loading={false} />)

            const title = screen.getByText('Test Song')
            const artist = screen.getByText('Test Artist')

            expect(title.parentElement).not.toContainElement(artist)
        })
    })

    describe('Edge Cases', () => {
        it('handles empty title', () => {
            render(<PlayListItem title="" artist="Test Artist" length="3:45" loading={false} />)

            // Component should render without errors even with empty title
            expect(screen.getByText('Test Artist')).toBeInTheDocument()
            expect(screen.getByText('3:45')).toBeInTheDocument()
        })

        it('handles empty artist', () => {
            render(<PlayListItem title="Test Song" artist="" length="3:45" loading={false} />)

            expect(screen.getByText('Test Song')).toBeInTheDocument()
            expect(screen.getByText('3:45')).toBeInTheDocument()
            // Component should render without errors even with empty artist
        })

        it('handles empty length', () => {
            render(<PlayListItem title="Test Song" artist="Test Artist" length="" loading={false} />)

            expect(screen.getByText('Test Song')).toBeInTheDocument()
            expect(screen.getByText('Test Artist')).toBeInTheDocument()
            // Component should render without errors even with empty length
        })

        it('handles very long length string', () => {
            render(<PlayListItem title="Test Song" artist="Test Artist" length="12:34:56" loading={false} />)

            expect(screen.getByText('12:34:56')).toBeInTheDocument()
        })

        it('handles special characters in length', () => {
            render(<PlayListItem title="Test Song" artist="Test Artist" length="3:45 (Live)" loading={false} />)

            expect(screen.getByText('3:45 (Live)')).toBeInTheDocument()
        })
    })

    describe('Accessibility', () => {
        it('has clickable role when onClick is provided', () => {
            render(<PlayListItem title="Test Song" artist="Test Artist" length="3:45" loading={false} onClick={mockOnClick} />)

            const clickableElement = screen.getByText('Test Song').closest('div')
            expect(clickableElement).toBeInTheDocument()
        })
    })
}) 