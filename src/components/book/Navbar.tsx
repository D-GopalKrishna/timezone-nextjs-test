import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import RenzoImage from '@/assets/images/RenzoImage.png'
// import { useDispatch } from 'react-redux'; 


const Navbar = () => {
    const [isLoggedIn, setIsLoggedIn] = React.useState(0)
    // const navigate = useNavigate()
    // const dispatch = useDispatch();
    return (
        <div style={styles.container}>
            <div className='d-flex flex-row justify-content-between '>
                <Link href='/'>
                    <Image width={160}  src={RenzoImage} alt="Logo" />
                </Link>

                {
                    isLoggedIn ? (
                        <Link href='/' className="text-decoration-none text-dark-800 mt-2">
                            <div className="rounded-3  overflow-hidden d-flex align-items-center">
                                <div className="px-4 py-2">
                                    <p className="mb-1 text-dark-800">Logout</p>
                                </div>
                            </div>
                        </Link>
                    ) : (
                        <Link href='api/auth/signin' className="text-decoration-none text-dark-800 mt-2">
                            <div className="rounded-3  overflow-hidden d-flex align-items-center">
                                <div className="px-4 py-2">
                                    <p className="mb-1 text-dark-800">Login</p>
                                </div>
                            </div>
                        </Link>
                    )
                }
            </div>

        </div>
    )
}

const styles = {
    container: {
        width: '100%',
        paddingLeft: '8rem',
        paddingRight: '8rem',
        paddingTop: '1rem',
        paddingBottom: '1rem',
    }
}


export default Navbar