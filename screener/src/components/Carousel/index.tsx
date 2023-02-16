import React from 'react';
import AliceCarousel from 'react-alice-carousel';
import 'react-alice-carousel/lib/alice-carousel.css';
import c1 from '../../assets/c1.jpeg'
import c2 from '../../assets/c2.jpeg'

const responsive = {
    0: { items: 1 },
    568: { items: 2 },
    1024: { items: 4 },
};

const items = [
    <div className="item flex flex-col w-[350px] gap-4  p-2 rounded-md" data-value="1">
            <div className="flex justify-between">
                <p className="font-bold text-left flex justify-center">Here is Why an Economic Slowdown may Boost Roku's (NASDAQ:ROKU) Business</p>
                <img src={c2} alt="" className="w-40 h-40 object-fit"/>
            </div>
            <div className="flex px-8 gap-4">
                <div className="avatar">Richard Brandson </div>
                <div className="timeline">| May 24</div>
            </div>
            <div className="news-content font-semibold text-left w-full">
                While an economic slowdown crushes stocks, it may become a catalyst event for Roku to acquire more market share as some consumers are switching from paid to free.
            </div>
    </div>,
       <div className="item flex flex-col w-[350px] gap-4  p-2 rounded-md" data-value="2">
            <div className="flex justify-between">
                <p className="font-bold text-left flex justify-center">Here is Why an Economic Slowdown may Boost Roku's (NASDAQ:ROKU) Business</p>
                <img src={c2} alt="" className="w-40 h-40 object-fit"/>
            </div>
            <div className="flex px-8 gap-4">
                <div className="avatar">Richard Brandson </div>
                <div className="timeline">| May 24</div>
            </div>
            <div className="news-content font-semibold text-left w-full">
                While an economic slowdown crushes stocks, it may become a catalyst event for Roku to acquire more market share as some consumers are switching from paid to free.
            </div>
    </div>,
    <div className="item flex flex-col w-[350px] gap-4  p-2 rounded-md" data-value="3">
            <div className="flex justify-between">
                <p className="font-bold text-left flex justify-center">Here is Why an Economic Slowdown may Boost Roku's (NASDAQ:ROKU) Business</p>
                <img src={c2} alt="" className="w-40 h-40 object-fit"/>
            </div>
            <div className="flex px-8 gap-4">
                <div className="avatar">Richard Brandson </div>
                <div className="timeline">| May 24</div>
            </div>
            <div className="news-content font-semibold text-left w-full">
                While an economic slowdown crushes stocks, it may become a catalyst event for Roku to acquire more market share as some consumers are switching from paid to free.
            </div>
    </div>,
    <div className="item flex flex-col w-[350px] gap-4  p-2 rounded-md" data-value="4">
            <div className="flex justify-between">
                <p className="font-bold text-left flex justify-center">Here is Why an Economic Slowdown may Boost Roku's (NASDAQ:ROKU) Business</p>
                <img src={c2} alt="" className="w-40 h-40 object-fit"/>
            </div>
            <div className="flex px-8 gap-4">
                <div className="avatar">Richard Brandson </div>
                <div className="timeline">| May 24</div>
            </div>
            <div className="news-content font-semibold text-left w-full">
                While an economic slowdown crushes stocks, it may become a catalyst event for Roku to acquire more market share as some consumers are switching from paid to free.
            </div>
    </div>,
    <div className="item flex flex-col w-[350px] gap-4  p-2 rounded-md" data-value="5">
            <div className="flex justify-between">
                <p className="font-bold text-left flex justify-center">Here is Why an Economic Slowdown may Boost Roku's (NASDAQ:ROKU) Business</p>
                <img src={c2} alt="" className="w-40 h-40 object-fit"/>
            </div>
            <div className="flex px-8 gap-4">
                <div className="avatar">Richard Brandson </div>
                <div className="timeline">| May 24</div>
            </div>
            <div className="news-content font-semibold text-left w-full">
                While an economic slowdown crushes stocks, it may become a catalyst event for Roku to acquire more market share as some consumers are switching from paid to free.
            </div>
    </div>,
    <div className="item flex flex-col w-[350px] gap-4  p-2 rounded-md" data-value="6">
            <div className="flex justify-between">
                <p className="font-bold text-left flex justify-center">Here is Why an Economic Slowdown may Boost Roku's (NASDAQ:ROKU) Business</p>
                <img src={c2} alt="" className="w-40 h-40 object-fit"/>
            </div>
            <div className="flex px-8 gap-4">
                <div className="avatar">Richard Brandson </div>
                <div className="timeline">| May 24</div>
            </div>
            <div className="news-content font-semibold text-left w-full">
                While an economic slowdown crushes stocks, it may become a catalyst event for Roku to acquire more market share as some consumers are switching from paid to free.
            </div>
    </div>,
];

const Carousel = () => (
    <AliceCarousel
        items={items}
        responsive={responsive}
        controlsStrategy="alternate"
        autoPlay
        infinite
    />
);
const index = () => {
  return (
    <div className="bg-slate-200">
        <h1 className="text-left text-3xl py-8 px-8 text-semibold">Latest Coverage</h1>
        <Carousel/>
    </div>
  )
}



export default index

