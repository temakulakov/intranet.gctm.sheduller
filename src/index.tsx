import React from 'react';
import ReactDOM from 'react-dom/client';
import './styles/index.scss';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";
import {BrowserRouter} from "react-router-dom";
import {Provider} from "react-redux";
import store from "./store/store";
import {createTheme, CssBaseline, ThemeProvider} from "@mui/material";

const theme = createTheme({
    palette: {
        primary: {
            main: '#9D2135', // Новый цвет акцента, здесь пример с оранжевым цветом
        },
        // Дополнительно, можно изменить и secondary, если нужно
        secondary: {
            // main: '#8A1635', // Пример изменения вторичного цвета
            main: '#9D2135', // Новый цвет акцента, здесь пример с оранжевым цветом
        },
    },
});


const queryClient = new QueryClient({});

const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
);

root.render(
    <ThemeProvider theme={theme}>
        <React.StrictMode>
            <Provider store={store}>
                <QueryClientProvider client={queryClient}>
                    <BrowserRouter>
                        <App/>
                    </BrowserRouter>
                </QueryClientProvider>
            </Provider>
        </React.StrictMode>
    </ThemeProvider>
);

// If you want to start measuring performance in your app, pass a function
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
