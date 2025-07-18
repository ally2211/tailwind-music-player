import '@testing-library/jest-dom'
import { vi } from 'vitest'

// Mock fetch for API calls
global.fetch = vi.fn(() =>
    Promise.resolve({
        ok: true,
        json: () => Promise.resolve([
            {
                id: "test-song-1",
                title: "Test Song",
                artist: "Test Artist",
                genre: "Test",
                duration: 180
            }
        ])
    } as Response)
)

// Mock audio element
Object.defineProperty(window, 'HTMLAudioElement', {
    writable: true,
    value: {
        prototype: {
            play: vi.fn(),
            pause: vi.fn(),
            addEventListener: vi.fn(),
            removeEventListener: vi.fn(),
        },
    },
}) 