import './style.scss';
import './app/index';

import { search, checked, filtered, sortered } from "./app/app";
import { start } from "./app/rendering";
import { slider } from "./app/slider";


start();
slider();
checked();
sortered();
search();