import React from 'react';
import classes from './creditcard.module.css';

const CreditCard = ({cardNumber, cvv, name, expiryDate}) => {
  return (
    <div>
      <div className={classes.card}>
        <div className={classes.cardInner}>
          <div className={classes.cardFront}>
            <div className={classes.cardBg} />
            <div className={classes.cardGlow} />
            <svg
              width={72}
              height={24}
              viewBox="0 0 72 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className={classes.logo}
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M52.3973 1.01093L51.5588 5.99054C49.0448 4.56717 43.3231 4.23041 43.3231 6.85138C43.3231 7.89285 44.6177 8.60913 46.178 9.47241C48.5444 10.7817 51.5221 12.4291 51.5221 16.062C51.5221 21.8665 45.4731 24 41.4645 24C37.4558 24 34.8325 22.6901 34.8325 22.6901L35.7065 17.4848C38.1115 19.4688 45.4001 20.032 45.4001 16.8863C45.4001 15.5645 43.9656 14.785 42.3019 13.8811C40.0061 12.6336 37.2742 11.1491 37.2742 7.67563C37.2742 1.30988 44.1978 0 47.1132 0C49.8102 0 52.3973 1.01093 52.3973 1.01093ZM66.6055 23.6006H72L67.2966 0.414276H62.5732C60.3923 0.414276 59.8612 2.14215 59.8612 2.14215L51.0996 23.6006H57.2234L58.4481 20.1566H65.9167L66.6055 23.6006ZM60.1406 15.399L63.2275 6.72235L64.9642 15.399H60.1406ZM14.7942 16.3622L20.3951 0.414917H26.7181L17.371 23.6012H11.2498L6.14551 3.45825C2.83215 1.41281 0 0.807495 0 0.807495L0.108643 0.414917H9.36816C11.9161 0.414917 12.1552 2.50314 12.1552 2.50314L14.1313 12.9281L14.132 12.9294L14.7942 16.3622ZM25.3376 23.6006H31.2126L34.8851 0.414917H29.0095L25.3376 23.6006Z"
                fill="white"
              />
            </svg>
            <div className={classes.cardContactless}>
              <svg xmlns="http://www.w3.org/2000/svg" width={46} height={56}>
                <path
                  fill="none"
                  stroke="#f9f9f9"
                  strokeWidth={6}
                  strokeLinecap="round"
                  d="m35,3a50,50 0 0,1 0,50M24,8.5a39,39 0 0,1 0,39M13.5,13.55a28.2,28.5
    0 0,1 0,28.5M3,19a18,17 0 0,1 0,18"
                />
              </svg>
            </div>
            <div className={classes.cardChip} />
            <div className={classes.cardHolder}>{name}</div>
            <div className={classes.cardNumber}>{cardNumber.replace(/(\d{4})/g, '$1 ').trim()}</div>
            <div className={classes.cardValid}>{new Date(expiryDate).getMonth() + 1}/{new Date(expiryDate).getFullYear().toString().slice(-2)}</div>
          </div>
          <div className={classes.cardBack}>
            <div className={classes.cardSignature}>{name}</div>
            <div className={classes.cardSeccode}>{cvv}</div>
          </div>
        </div>
      </div>

    </div>
  )
}

export default CreditCard;