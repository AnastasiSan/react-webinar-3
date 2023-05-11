import React from 'react';
import {createRoot} from 'react-dom/client';
import {createElement, generateId} from './utils.js';
import App from './app.js';
import Store from './store.js';

const store = new Store({
  list: [
    {title: 'Название элемента'},
    {title: 'Некий объект'},
    {title: 'Заголовок'},
    {title: 'Очень длинное название элемента из семи слов'},
    {title: 'Запись'},
    {title: 'Шестая запись'},
    {title: 'Седьмая запись'},
  ].map(item => ({...item, id: generateId(), clicked: 0}))
});


const root = createRoot(document.getElementById('root'));

store.subscribe(() => {
  root.render(<App store={store}/>);
});

// Первый рендер приложения
root.render(<App store={store}/>);
