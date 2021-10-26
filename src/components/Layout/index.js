import React from 'react';
import Sidebar from '../Sidebar';
import css from './index.module.css';
import Header from '../Header';
export default function Layout({ children }) {
	return (
		<>
			<div className={css.layoutComponent}>
				<Sidebar />
				<div className={css.right}>
					<Header />
					{children}
				</div>
			</div>
		</>
	);
}
