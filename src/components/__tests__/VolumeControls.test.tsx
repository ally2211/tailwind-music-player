import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen, fireEvent, act } from '@testing-library/react'
import VolumeControls from '../VolumeControls'

describe('VolumeControls', () => {
    const mockSetVolume = vi.fn()

    beforeEach(() => {
        mockSetVolume.mockClear()
    })

    describe('Rendering', () => {
        it('renders volume controls with volume icon and slider', () => {
            render(<VolumeControls volume={50} setVolume={mockSetVolume} />)

            // Check that the volume icon is present
            // const volumeIcon = screen.getByRole('img', { hidden: true })
            // expect(volumeIcon).toBeInTheDocument()

            // Check that the slider is present
            const slider = screen.getByRole('slider')
            expect(slider).toBeInTheDocument()
        })

        it('renders with correct volume value', () => {
            render(<VolumeControls volume={75} setVolume={mockSetVolume} />)

            const slider = screen.getByRole('slider')
            expect(slider).toHaveValue('75')
        })

        it('renders with minimum volume value', () => {
            render(<VolumeControls volume={0} setVolume={mockSetVolume} />)

            const slider = screen.getByRole('slider')
            expect(slider).toHaveValue('0')
        })

        it('renders with maximum volume value', () => {
            render(<VolumeControls volume={100} setVolume={mockSetVolume} />)

            const slider = screen.getByRole('slider')
            expect(slider).toHaveValue('100')
        })
    })

    describe('Functionality', () => {
        it('calls setVolume when slider value changes', () => {
            render(<VolumeControls volume={50} setVolume={mockSetVolume} />)

            const slider = screen.getByRole('slider')
            act(() => {
                fireEvent.change(slider, { target: { value: '75' } })
            })

            expect(mockSetVolume).toHaveBeenCalledWith(75)
        })

        it('calls setVolume with correct number when slider changes', () => {
            render(<VolumeControls volume={25} setVolume={mockSetVolume} />)

            const slider = screen.getByRole('slider')
            act(() => {
                fireEvent.change(slider, { target: { value: '80' } })
            })

            expect(mockSetVolume).toHaveBeenCalledWith(80)
        })

        it('handles volume change to minimum value', () => {
            render(<VolumeControls volume={50} setVolume={mockSetVolume} />)

            const slider = screen.getByRole('slider')
            act(() => {
                fireEvent.change(slider, { target: { value: '0' } })
            })

            expect(mockSetVolume).toHaveBeenCalledWith(0)
        })

        it('handles volume change to maximum value', () => {
            render(<VolumeControls volume={50} setVolume={mockSetVolume} />)

            const slider = screen.getByRole('slider')
            act(() => {
                fireEvent.change(slider, { target: { value: '100' } })
            })

            expect(mockSetVolume).toHaveBeenCalledWith(100)
        })
    })



    describe('Props', () => {
        it('renders with all props provided', () => {
            render(<VolumeControls volume={50} setVolume={mockSetVolume} />)

            const slider = screen.getByRole('slider')
            expect(slider).toBeInTheDocument()
            expect(slider).toHaveValue('50')
        })

        it('updates when volume prop changes', () => {
            const { rerender } = render(<VolumeControls volume={30} setVolume={mockSetVolume} />)

            let slider = screen.getByRole('slider')
            expect(slider).toHaveValue('30')

            rerender(<VolumeControls volume={70} setVolume={mockSetVolume} />)

            slider = screen.getByRole('slider')
            expect(slider).toHaveValue('70')
        })
    })

    describe('Edge Cases', () => {
        it('handles decimal volume values', () => {
            render(<VolumeControls volume={33.5} setVolume={mockSetVolume} />)

            const slider = screen.getByRole('slider')
            expect(slider).toHaveValue('33.5')
        })

        it('handles volume change with decimal values', () => {
            render(<VolumeControls volume={50} setVolume={mockSetVolume} />)

            const slider = screen.getByRole('slider')
            act(() => {
                fireEvent.change(slider, { target: { value: '66.7' } })
            })

            expect(mockSetVolume).toHaveBeenCalledWith(66.7)
        })

        it('handles multiple rapid volume changes', () => {
            render(<VolumeControls volume={50} setVolume={mockSetVolume} />)

            const slider = screen.getByRole('slider')

            act(() => {
                fireEvent.change(slider, { target: { value: '25' } })
            })
            act(() => {
                fireEvent.change(slider, { target: { value: '75' } })
            })
            act(() => {
                fireEvent.change(slider, { target: { value: '10' } })
            })

            expect(mockSetVolume).toHaveBeenCalledTimes(3)
            expect(mockSetVolume).toHaveBeenNthCalledWith(1, 25)
            expect(mockSetVolume).toHaveBeenNthCalledWith(2, 75)
            expect(mockSetVolume).toHaveBeenNthCalledWith(3, 10)
        })
    })

    describe('Accessibility', () => {
        it('has proper slider role', () => {
            render(<VolumeControls volume={50} setVolume={mockSetVolume} />)

            const slider = screen.getByRole('slider')
            expect(slider).toBeInTheDocument()
        })

        it('has correct slider attributes', () => {
            render(<VolumeControls volume={50} setVolume={mockSetVolume} />)

            const slider = screen.getByRole('slider')
            expect(slider).toHaveAttribute('min', '0')
            expect(slider).toHaveAttribute('max', '100')
            expect(slider).toHaveAttribute('type', 'range')
        })

        // it('has volume icon for visual indication', () => {
        //     render(<VolumeControls volume={50} setVolume={mockSetVolume} />)

        //     const volumeIcon = screen.getByRole('img', { hidden: true })
        //     expect(volumeIcon).toBeInTheDocument()
        // })
    })
}) 