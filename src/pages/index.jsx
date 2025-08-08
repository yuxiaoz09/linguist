import Layout from "./Layout.jsx";

import Dashboard from "./Dashboard";

import Children from "./Children";

import Activities from "./Activities";

import Progress from "./Progress";

import Settings from "./Settings";

import ChildHome from "./ChildHome";

import ChildActivity from "./ChildActivity";

import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';

const PAGES = {
    
    Dashboard: Dashboard,
    
    Children: Children,
    
    Activities: Activities,
    
    Progress: Progress,
    
    Settings: Settings,
    
    ChildHome: ChildHome,
    
    ChildActivity: ChildActivity,
    
}

function _getCurrentPage(url) {
    if (url.endsWith('/')) {
        url = url.slice(0, -1);
    }
    let urlLastPart = url.split('/').pop();
    if (urlLastPart.includes('?')) {
        urlLastPart = urlLastPart.split('?')[0];
    }

    const pageName = Object.keys(PAGES).find(page => page.toLowerCase() === urlLastPart.toLowerCase());
    return pageName || Object.keys(PAGES)[0];
}

// Create a wrapper component that uses useLocation inside the Router context
function PagesContent() {
    const location = useLocation();
    const currentPage = _getCurrentPage(location.pathname);
    
    return (
        <Layout currentPageName={currentPage}>
            <Routes>            
                
                    <Route path="/" element={<Dashboard />} />
                
                
                <Route path="/Dashboard" element={<Dashboard />} />
                
                <Route path="/Children" element={<Children />} />
                
                <Route path="/Activities" element={<Activities />} />
                
                <Route path="/Progress" element={<Progress />} />
                
                <Route path="/Settings" element={<Settings />} />
                
                <Route path="/ChildHome" element={<ChildHome />} />
                
                <Route path="/ChildActivity" element={<ChildActivity />} />
                
            </Routes>
        </Layout>
    );
}

export default function Pages() {
    return (
        <Router>
            <PagesContent />
        </Router>
    );
}