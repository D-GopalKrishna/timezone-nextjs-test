import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const HomeComponent = () => {
  return (
    <div>
      <h2> This is the Authenticated route</h2>
      {/* <div
        className={'home-header'}
        style={booking_engine_content?.bengine_cover_image?.cover_2x && {
          backgroundImage: `url(${booking_engine_content.bengine_cover_image.cover_2x})`,
          backgroundPosition: 'center',
          backgroundSize: 'cover',
          backgroundRepeat: 'no-repeat'
        }}
      >
        <div className={
          `w-100 h-100 d-flex ${(booking_engine_content?.bengine_title || booking_engine_content?.bengine_title)
            ? 'home-header-inner'
            : 'home-header-inner-empty'
          }`
        }>
          <div className={'text-light align-self-center flex-fill text-center'}>
            <h1 className={'mb-4'}>{booking_engine_content.bengine_title}</h1>
            <h6>{booking_engine_content.bengine_sub_title}</h6>
          </div>
        </div>
      </div>

      <div className={'container mt-5'}>
        {booking_engine_content.bengine_description &&
          <div className={'row'}>
            <div className={'col-sm-12 col-md-8 mb-5'}>
              <h2 className={'mb-3'}>
                <FontAwesomeIcon icon={faFileInvoice} className={'me-2 grey-cl'} />
                {booking_engine_content.bengine_description_title}
              </h2>
              <p className={'display-linebreak font-weight-light'}>{booking_engine_content.bengine_description}</p>
            </div>
            <div className={'col-sm-12 col-md-4 mb-5 px-lg-5'}>
              {!_.isEmpty(secureBoxContent) &&
                <div className="list-group mt-md-5">
                  {secureBoxContent.map((data, i) => (
                    <div className="list-group-item" key={i}>
                      <div className="d-flex align-items-center">
                        <div className="flex-shrink-0">
                          <FontAwesomeIcon icon={data.icon} size={'2x'} className={`align-self-center ${data.iconColor}`} />
                        </div>
                        <div className="flex-grow-1 ms-3">
                          <p className="mb-1"><strong>{data.title}</strong></p>
                          <p className="mb-0 small text-muted">{data.description}</p>
                        </div>
                      </div>
                    </div>
                  ))
                  }
                </div>
              }
            </div>
          </div>
        }

        {(!_.isEmpty(property.room_types) && property.allow_room_booking_engine) &&
          <div className={'row mb-5'}>
            <div className={'col-12'}>
              <div className="row">
                <div className="col-md-8">
                  <h2><FontAwesomeIcon icon={faHome} className={'me-2 grey-cl'} /> Our Rooms</h2>
                </div>
                <div className="d-lg-flex align-items-center justify-content-end col-md-4">
                  <Link to={'/room'}>
                    See all room <FontAwesomeIcon icon={faArrowRight} size={'sm'} className={'ms-2 grey-cl'} />
                  </Link>
                </div>
              </div>
              <div>
                <div className={'row'}>
                  {property.room_types.map((data, i) => (
                    <div className={'col-sm-6 col-md-4 col-lg-3 my-3'} key={i}>
                      <RoomTypeListView
                        data={data}
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        }

        {!_.isEmpty(property.slider_images) &&
          <div className={'row'}>
            <div
              className={`mb-5 col-sm-12 col-md-7 ${!booking_engine_content.bengine_slider_description && 'mx-auto'}`}>
              <Carousel>
                {property.slider_images.map((data, i) =>
                  <Carousel.Item key={i}>
                    <img className="d-block w-100" alt={'Slider'} src={data.image.slider_2x} />
                  </Carousel.Item>
                )}
              </Carousel>
            </div>
            {booking_engine_content.bengine_slider_description &&
              <div className={'mb-5 col-sm-12 col-md-5 align-self-center'}>
                <h2 className={'mb-3'}>
                  <FontAwesomeIcon icon={faFileInvoice} className={'me-2 grey-cl'} />
                  {booking_engine_content.bengine_slider_title}
                </h2>
                <p
                  className={'font-weight-light display-linebreak'}>{booking_engine_content.bengine_slider_description}</p>
              </div>
            }
          </div>
        }
      </div> */}
    </div>
  )
}

export default HomeComponent