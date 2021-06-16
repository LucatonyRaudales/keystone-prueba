import React, { useEffect } from 'react';
import IPage from '../interfaces/page';
import logging from '../config/logging';
import { Container } from '@material-ui/core';

//components
import UserTypesCard from '../components/userTypesList';
import EmployeeList from '../components/EmployeList';
import Reset from '../components/reset';
import Titulo from '../components/titulo';

const HomePage: React.FunctionComponent<IPage> = props => {
    useEffect(() => {
        logging.info(`Loading ${props.name}`);
    }, [props.name])

    return (
        <div style={{display: 'flex',  justifyContent:'center', alignItems:'center', height: '100vh'}}>
            <div> 
                <Container maxWidth="xl">
                    <Titulo />
                    <Reset />
                    <UserTypesCard />
                    <EmployeeList />
                </Container>
            </div>
        </div>
    );
}

export default HomePage;