import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Landing from './pages/Landing';
import TeacherList from './pages/TeacherList';
import TeacherForm from './pages/TeacherForm';

function NotFound () {
    return (
        <h1>Página não encontrada!</h1>
    );
}

function Routes () {
    return (
        <BrowserRouter>
            <Switch>
                <Route exact path='/' component={ Landing }/>
                <Route exact path='/study' component={ TeacherList } />
                <Route exact path='/give-classes' component={ TeacherForm } />
                <Route component={ NotFound } />
            </Switch>
        </BrowserRouter>
    )
}

export default Routes;
