import FeatureForm from './components/FeatureForm';
import BugForm from './components/BugForm';
import { useRecoilValue } from 'recoil';

import React from 'react';
import FeaturePreview from './components/FeaturePreview';
import LayoutHome from './components/LayoutHome/LayoutHome';
import { LayoutForm } from './components/LayoutForm/LayoutForm';

import { BUG_PAGE, currentPage, FEATURE_PAGE, HOME_PAGE } from './constants';

import './index.css';
import BugPreview from './components/BugPreview';

function App() {
    const pageName = useRecoilValue(currentPage);

    return (
        <>
            {pageName === HOME_PAGE && <LayoutHome />}
            {pageName === FEATURE_PAGE && <LayoutForm form={<FeatureForm />} preview={<FeaturePreview />} />}
            {pageName === BUG_PAGE && <LayoutForm form={<BugForm />} preview={<BugPreview />} />}
        </>
    );
}

export default App;
