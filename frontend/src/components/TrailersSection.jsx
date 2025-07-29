import React, { useState } from 'react'
import { dummyTrailers } from '../assets/assets'
import ReactPlayer from 'react-player'
import BlurCircle from './BlurCircle'
import { PlayCircleIcon } from 'lucide-react'

const TrailersSection = () => {
    const [currentTrailer, setCurrentTrailer] = useState(dummyTrailers[0])
    const [startIdx, setStartIdx] = useState(0)
    const visibleCount = 4
    const canGoLeft = startIdx > 0
    const canGoRight = startIdx + visibleCount < dummyTrailers.length

    const handleLeft = () => {
        if (canGoLeft) setStartIdx(startIdx - 1)
    }
    const handleRight = () => {
        if (canGoRight) setStartIdx(startIdx + 1)
    }

    // Thumbnail width + gap (w-40 = 160px, gap-6 = 24px)
    const thumbWidth = 160
    const gap = 24
    const slideAmount = startIdx * (thumbWidth + gap)

    return (
        <div className='px-6 md:px-16 lg:px-24 xl:px-44 py-20 overflow-hidden'>
            <p className='text-gray-300 font-medium text-lg max-w-[960px] mx-auto'>Trailers</p>

            <div className='relative mt-6'>
                <BlurCircle top='-100px' right='-100px'/>
                <ReactPlayer url={currentTrailer.videoUrl} controls={false} className="mx-auto max-w-full" width="960px" height="540px"/>
            </div>

            {/* Slider/Carousel for thumbnails - show 4 at a time with arrows and smooth transition */}
            <div className='w-full flex justify-center'>
                <div className='flex items-center gap-2 mt-10 pb-4' style={{ maxWidth: '1000px' }}>
                    <button
                        onClick={handleLeft}
                        disabled={!canGoLeft}
                        className={`p-2 rounded-full bg-gray-800 text-white transition disabled:opacity-40 disabled:cursor-not-allowed`}
                        aria-label='Previous trailers'
                    >
                        <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6" /></svg>
                    </button>
                    <div
                        className='overflow-hidden'
                        style={{ width: (thumbWidth + gap) * visibleCount - gap }}
                    >
                        <div
                            className='flex items-end gap-6 transition-transform duration-500 ease-in-out'
                            style={{ transform: `translateX(-${slideAmount}px)` }}
                        >
                            {dummyTrailers.map((trailer, idx) => (
                                <div
                                    key={trailer.image}
                                    className={`flex flex-col items-center cursor-pointer group select-none w-40 min-w-40`}
                                    onClick={() => setCurrentTrailer(trailer)}
                                >
                                    <div
                                        className={`relative w-40 h-28 rounded-xl overflow-hidden shadow-lg transition-all duration-200 group-hover:scale-105 group-hover:shadow-2xl ${currentTrailer.videoUrl === trailer.videoUrl ? 'ring-4 ring-primary scale-105' : 'ring-0'}`}
                                    >
                                        <img
                                            src={trailer.image}
                                            alt={trailer.title || 'trailer'}
                                            className='w-full h-full object-cover'
                                        />
                                        <PlayCircleIcon strokeWidth={1.6} className="absolute top-1/2 left-1/2 w-12 h-12 text-white opacity-90 drop-shadow-lg -translate-x-1/2 -translate-y-1/2 pointer-events-none"/>
                                    </div>
                                    <div className='w-40 text-xs md:text-sm text-center text-gray-200 mt-2 font-medium truncate'>
                                        {trailer.title || 'Trailer'}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                    <button
                        onClick={handleRight}
                        disabled={!canGoRight}
                        className={`p-2 rounded-full bg-gray-800 text-white transition disabled:opacity-40 disabled:cursor-not-allowed`}
                        aria-label='Next trailers'
                    >
                        <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6" /></svg>
                    </button>
                </div>
            </div>
        </div>
    )
}

export default TrailersSection
