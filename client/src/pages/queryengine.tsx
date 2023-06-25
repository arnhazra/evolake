import React, { useState } from 'react'
import { Button, Container, FloatingLabel, Form } from 'react-bootstrap'
import { Configuration, OpenAIApi } from 'openai'
import Constants from '@/constants/appConstants'

const QueryEnginePage = () => {
    const [selectedDb, setSelectedDb] = useState('')
    const [usertext, setUsertext] = useState('')
    const [answer, setAnswer] = useState('')
    const configuration = new Configuration({
        apiKey: Constants.OpenAIAPIKey,
    })
    const openai = new OpenAIApi(configuration)

    const dbOptions = [
        { value: "MongoDB", label: "Mongo DB" },
        { value: "SQL", label: "SQL" },
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
        const finalQuery = `Create a ${selectedDb} request to ${usertext.charAt(0).toLowerCase() + usertext.slice(1)}`
        try {
            const response = await openai.createCompletion({
                model: "text-davinci-003",
                prompt: finalQuery,
                temperature: 0.3,
                max_tokens: 60,
                top_p: 1.0,
                frequency_penalty: 0.0,
                presence_penalty: 0.0,
            })
            setAnswer(response.data.choices[0].text || '')
        } catch (error) {
            console.log(error)
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
                    <Form.Control type='text' placeholder='Your Query' onChange={(e) => setUsertext(e.target.value)} autoComplete={'off'} />
                </FloatingLabel><br />
                <Button onClick={fetchData}>Get My Query</Button>
                <div className="answer ps-4 pt-4">
                    {answer}
                </div>
            </div>
        </Container>
    )
}

export default QueryEnginePage