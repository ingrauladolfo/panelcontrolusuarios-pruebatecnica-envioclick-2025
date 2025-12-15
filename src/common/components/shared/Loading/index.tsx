import type { FC } from 'react';
import '@/common/styles/components/shared/Loading/index.css';
import type { LoadingProps } from '@/common/interfaces';
import { useLocation } from 'react-router';
import { pathToTitle } from '@/assets/data';


export const Loading: FC<LoadingProps> = ({ title: titleProp }) => {
    const { pathname } = useLocation()
    const matched = titleProp
        ? { title: titleProp } // fake shape para simplificar uso posterior
        : pathToTitle.find((p: any) => p.path === pathname)
    const title = titleProp
        ? titleProp
        : matched
            ? matched.title.split('|')[0].trim()
            : 'Error'
    return (
        <div className="loading-container">
            <div className="loading-spinner" />
            <p className="loading-text">Cargando {title}...</p>
        </div>
    );
};