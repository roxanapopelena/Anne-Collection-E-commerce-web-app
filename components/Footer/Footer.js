import React from 'react'
import Link from 'next/link'
import InstagramIcon from '@material-ui/icons/Instagram'
import FacebookIcon from '@material-ui/icons/Facebook'
import TwitterIcon from '@material-ui/icons/Twitter'
import LinkedInIcon from '@material-ui/icons/LinkedIn'
//import { Map, GoogleApiWrapper, Marker } from 'google-maps-react'

function Footer() {
  return (
    <div className='footer-container'>
      <section className='social-media'>
        <div className='social-media-wrap'>
          <div className='footer-logo'>
            <Link href='/' className='social-logo'>
              Ane Collections
            </Link>
          </div>
          <div className='website-rights'>© 2021 Ane Collections</div>
          <div className='social-icons'>
            <Link
              className='social-icon-link facebook'
              href='/'
            >
              <a>
                <FacebookIcon />
              </a>

            </Link>
            <Link
              className='social-icon-link instagram'
              href='https://www.instagram.com/ane.collections/'

            >
              <a>
                <InstagramIcon />
              </a>

            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Footer;
