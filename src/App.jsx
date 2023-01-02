import FeatureForm from './components/FeatureForm';
import BugForm from './components/BugForm';
import { useRecoilValue } from 'recoil';

import React from 'react';
import FeaturePreview from './components/FeaturePreview';
import LayoutHome from './components/LayoutHome/LayoutHome';
import { LayoutForm } from './components/LayoutForm/LayoutForm';

import { navigationAtom } from './recoil/atoms/navigation';
import BugPreview from './components/BugPreview';
import { BUG_PAGE, FEATURE_PAGE, HOME_PAGE } from './constants';

import './index.css';

function App() {
    const pageName = useRecoilValue(navigationAtom);

    return (
        <>
            {pageName === HOME_PAGE && <LayoutHome />}
            {pageName === FEATURE_PAGE && <LayoutForm form={<FeatureForm />} preview={<FeaturePreview />} />}
            {pageName === BUG_PAGE && <LayoutForm form={<BugForm />} preview={<BugPreview />} />}
        </>
    );
}

export default App;
