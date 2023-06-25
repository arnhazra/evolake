import { Fragment, useContext, useEffect, useState } from 'react'
import { Button } from 'react-bootstrap'
import endPoints from '@/constants/apiEndpoints'
import { NextPage } from 'next'
import { useRouter } from 'next/router'
import { AppContext } from '@/context/appStateProvider'
import axios from 'axios'
import { toast } from 'react-hot-toast'
import Constants from '@/constants/appConstants'
import moment from 'moment'
import contractAddress from '@/constants/contractAddress'
import Link from 'next/link'
import Show from '@/components/Show'
import jwtDecode from 'jwt-decode'

const SubscriptionPage: NextPage = () => {
    const [{ userState }] = useContext(AppContext)
    const [selectedPlan, setSelectedPlan] = useState('Free')
    const [tokenId, setTokenId] = useState('')
    const [expiry, setExpiry] = useState(0)

    useEffect(() => {
        try {
            const decodedSubId: any = jwtDecode(userState.subscriptionKey)
            setTokenId(decodedSubId.tokenId)
            setExpiry(decodedSubId.exp)
            setSelectedPlan(decodedSubId.selectedPlan)
        } catch (error) {
            setTokenId('')
        }
    }, [userState.subscriptionKey])

    return (
        <Fragment>
            <div className='box'>
                <p className='branding'>Subscription <i className='fa-solid fa-circle-plus'></i></p>
                <p className='smalltext'>Active plan {userState.subscriptionKey.length > 0 && `valid till ${moment.unix(expiry).format('DD MMM, YYYY')}`}</p>
                <h4>
                    {selectedPlan}
                    <Show when={userState.subscriptionKey.length > 0}>
                        <Link title='Access NFT' target='_blank' passHref href={`https://mumbai.polygonscan.com/token/${contractAddress.nftContractAddress}?a=${tokenId}`}>
                            <i className="fa-solid fa-shield"></i>
                        </Link>
                    </Show>
                </h4>
                <Link className='btn btn-block' href={'/pricing'}>View Pricing <i className='fa-solid fa-circle-arrow-right'></i></Link>
            </div>
        </Fragment >
    )
}

export default SubscriptionPage