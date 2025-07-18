import { useState, useRef, useEffect, forwardRef, useImperativeHandle } from 'react';

interface AudioPlayerProps {
    songUrl?: string;
    volume: number;
    onPlayStateChange?: (isPlaying: boolean) => void;
    onEnded?: () => void;
}

export interface AudioPlayerRef {
    play: () => void;
    pause: () => void;
    setSpeed: (speed: number) => void;
}

const AudioPlayer = forwardRef<AudioPlayerRef, AudioPlayerProps>(({
    songUrl,
    volume,
    onPlayStateChange,
    onEnded
}, ref) => {
    const [playbackSpeed, setPlaybackSpeed] = useState(1);
    const audioRef = useRef<HTMLAudioElement>(null);
    const previousSongUrl = useRef<string | undefined>(undefined);

    // Expose methods to parent component
    useImperativeHandle(ref, () => ({
        play: () => {
            console.log('AudioPlayer play called, songUrl:', songUrl);
            console.log('audioRef.current:', audioRef.current);
            console.log('audioRef.current.src:', audioRef.current?.src);
            console.log('audioRef.current.volume:', audioRef.current?.volume);
            console.log('audioRef.current.muted:', audioRef.current?.muted);
            console.log('audioRef.current.readyState:', audioRef.current?.readyState);
            if (audioRef.current) {
                audioRef.current.play().then(() => {
                    console.log('Audio started playing successfully');
                    console.log('Audio currentTime:', audioRef.current?.currentTime);
                    console.log('Audio duration:', audioRef.current?.duration);
                    console.log('🎵 AUDIO IS PLAYING - CHECK YOUR SPEAKERS/HEADPHONES! 🎵');
                    if (onPlayStateChange) {
                        onPlayStateChange(true);
                    }
                }).catch((error) => {
                    console.error('Failed to play audio:', error);
                    console.error('Error name:', error.name);
                    console.error('Error message:', error.message);
                });
            } else {
                console.error('audioRef.current is null');
            }
        },
        pause: () => {
            console.log('AudioPlayer pause called');
            if (audioRef.current) {
                audioRef.current.pause();
                if (onPlayStateChange) {
                    onPlayStateChange(false);
                }
            }
        },
        setSpeed: (speed: number) => {
            setPlaybackSpeed(speed);
        }
    }));

    // Update audio source when songUrl changes
    useEffect(() => {
        console.log('AudioPlayer: songUrl changed to:', songUrl);
        if (audioRef.current && songUrl) {
            console.log('AudioPlayer: Setting audio src to:', songUrl);
            audioRef.current.src = songUrl;

            // Test if the audio URL is accessible
            fetch(songUrl, { method: 'HEAD' })
                .then(response => {
                    console.log('AudioPlayer: URL accessibility test - Status:', response.status);
                    console.log('AudioPlayer: URL accessibility test - Content-Type:', response.headers.get('content-type'));
                })
                .catch(error => {
                    console.error('AudioPlayer: URL accessibility test failed:', error);
                });

            // Only reset play state if we're changing to a different song
            // (not when the same song is clicked again)
            if (onPlayStateChange && previousSongUrl.current !== songUrl) {
                onPlayStateChange(false);
            }
            previousSongUrl.current = songUrl;
        } else {
            console.log('AudioPlayer: No songUrl or audioRef not available');
        }
    }, [songUrl, onPlayStateChange]);

    // Update audio volume when volume prop changes
    useEffect(() => {
        console.log('AudioPlayer: Volume changed to:', volume);
        if (audioRef.current) {
            const volumeLevel = volume / 100;
            console.log('AudioPlayer: Setting volume to:', volumeLevel);
            audioRef.current.volume = volumeLevel;
            console.log('AudioPlayer: Actual audio element volume:', audioRef.current.volume);
            console.log('AudioPlayer: Audio muted:', audioRef.current.muted);
        }
    }, [volume]);

    // Update playback speed
    useEffect(() => {
        if (audioRef.current) {
            audioRef.current.playbackRate = playbackSpeed;
        }
    }, [playbackSpeed]);

    const handleEnded = () => {
        if (onPlayStateChange) {
            onPlayStateChange(false);
        }
        if (onEnded) {
            onEnded();
        }
    };

    return (
        <audio
            ref={audioRef}
            onEnded={handleEnded}
            onPlay={() => onPlayStateChange?.(true)}
            onPause={() => onPlayStateChange?.(false)}
            onLoadedData={() => console.log('AudioPlayer: Audio data loaded, duration:', audioRef.current?.duration)}
            onError={(e) => console.error('AudioPlayer: Audio error:', e)}
            onCanPlay={() => console.log('AudioPlayer: Audio can play')}
            onLoadStart={() => console.log('AudioPlayer: Audio load started')}
            preload="auto"
            controls={false}
        />
    );
});

AudioPlayer.displayName = 'AudioPlayer';

export default AudioPlayer; 