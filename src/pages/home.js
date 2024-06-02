import React from 'react';
import "./home.css";
import ImageSlider from '../components/slider/ImageSlider';
import { SliderData } from '../components/slider/SliderData';

const Home = () => {
  return (
    <>
    <ImageSlider slides = {SliderData} />
    </>
  );
};

export default Home;