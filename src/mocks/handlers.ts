import { http, HttpResponse } from 'msw'

// Mock data for the music player
const mockPlaylist = [
    {
        id: "1",
        title: "Bohemian Rhapsody",
        artist: "Queen",
        genre: "Rock",
        duration: 355,
        cover: "https://example.com/bohemian-rhapsody.jpg",
        song: "https://example.com/bohemian-rhapsody.mp3"
    },
    {
        id: "2",
        title: "Hotel California",
        artist: "Eagles",
        genre: "Rock",
        duration: 390,
        cover: "https://example.com/hotel-california.jpg",
        song: "https://example.com/hotel-california.mp3"
    },
    {
        id: "3",
        title: "Stairway to Heaven",
        artist: "Led Zeppelin",
        genre: "Rock",
        duration: 482,
        cover: "https://example.com/stairway-to-heaven.jpg",
        song: "https://example.com/stairway-to-heaven.mp3"
    },
    {
        id: "4",
        title: "Imagine",
        artist: "John Lennon",
        genre: "Pop",
        duration: 183,
        cover: "https://example.com/imagine.jpg",
        song: "https://example.com/imagine.mp3"
    },
    {
        id: "5",
        title: "Hey Jude",
        artist: "The Beatles",
        genre: "Pop",
        duration: 431,
        cover: "https://example.com/hey-jude.jpg",
        song: "https://example.com/hey-jude.mp3"
    }
]

const mockSongDetails = {
    id: "1",
    title: "Bohemian Rhapsody",
    artist: "Queen",
    genre: "Rock",
    duration: 355,
    cover: "https://example.com/bohemian-rhapsody.jpg",
    song: "https://example.com/bohemian-rhapsody.mp3",
    album: "A Night at the Opera",
    year: 1975
}

export const handlers = [
    // Mock playlist endpoint
    http.get('/api/playlist', () => {
        return HttpResponse.json(mockPlaylist)
    }),

    // Mock playlist endpoint with v1 path
    http.get('/api/v1/playlist', () => {
        return HttpResponse.json(mockPlaylist)
    }),

    // Mock song details endpoint
    http.get('/api/songs/:id', ({ params }) => {
        const { id } = params
        const song = mockPlaylist.find(song => song.id === id)

        if (!song) {
            return new HttpResponse(null, { status: 404 })
        }

        return HttpResponse.json({ ...song, ...mockSongDetails })
    }),

    // Mock search endpoint
    http.get('/api/search', ({ request }) => {
        const url = new URL(request.url)
        const query = url.searchParams.get('q')

        if (!query) {
            return HttpResponse.json([])
        }

        const filteredSongs = mockPlaylist.filter(song =>
            song.title.toLowerCase().includes(query.toLowerCase()) ||
            song.artist.toLowerCase().includes(query.toLowerCase())
        )

        return HttpResponse.json(filteredSongs)
    }),

    // Mock error endpoint for testing error handling
    http.get('/api/error', () => {
        return new HttpResponse(null, { status: 500 })
    }),

    // Mock slow endpoint for testing loading states
    http.get('/api/slow', async () => {
        await new Promise(resolve => setTimeout(resolve, 2000))
        return HttpResponse.json(mockPlaylist)
    })
] 