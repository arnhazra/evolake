import endPoints from '@/constants/apiEndpoints'
import axios from 'axios'
import React, { useState } from 'react'
import { Button, Container, FloatingLabel, Form } from 'react-bootstrap'

const QueryEnginePage = () => {
    const [selectedDb, setSelectedDb] = useState('SQL')
    const [userQuery, setUserQuery] = useState('')
    const [dbQuery, setDbQuery] = useState('')
    const [hasError, setError] = useState(false)

    const dbOptions = [
        { value: "SQL", label: "SQL" },
        { value: "MongoDB", label: "Mongo DB" },
        { value: "PostgreSQL", label: "Postgre SQL" },
        { value: "MariaDB", label: "Maria DB" },
        { value: "Firebase", label: "Firebase" },
        { value: "Prisma", label: "Prisma" },
        { value: "GraphQL", label: "GraphQL" },
        { value: "DynamoDB", label: "Dynamo DB" },
    ]

    const dbToDisplay = dbOptions.map((db) => {
        return <option className='options' key={db.value} value={db.value}>{db.label}</option>
    })

    const fetchData = async () => {
        try {
            const response = await axios.post(endPoints.generateQueryEndpoint, { selectedDb, userQuery })
            setDbQuery(response.data.msg)
        } catch (error) {
            setError(true)
        }
    }

    return (
        <Container>
            <div className="jumbotron mt-4">
                <p className="branding">Ask Your Query</p>
                <FloatingLabel controlId='floatingSelectGrid' label='Select Filter Category'>
                    <Form.Select onChange={(e): void => setSelectedDb(e.target.value)}>
                        {dbToDisplay}
                    </Form.Select>
                </FloatingLabel><br />
                <FloatingLabel controlId='floatingQuery' label='Your Query'>
                    <Form.Control type='text' placeholder='Your Query' onChange={(e) => setUserQuery(e.target.value)} autoComplete={'off'} />
                </FloatingLabel><br />
                <Button onClick={fetchData}>Generate Query</Button>
                <div className="answer ps-4 pt-4">
                    {dbQuery}
                </div>
            </div>
        </Container>
    )
}

export default QueryEnginePage