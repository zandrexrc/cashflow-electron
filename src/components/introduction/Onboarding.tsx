import React from 'react';

import { Button, Card, MobileStepper, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import PropTypes from 'prop-types';

import { onboardingImages } from '../../assets/images';
import { OnboardingSlides } from '../../constants';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexFlow: 'column nowrap',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: '100vh',
    backgroundColor: theme.palette.background.default,
    '& .card': {
      width: '600px',
      height: '450px',
      '& img': {
        width: '600px',
      },
      '& .description': {
        display: 'flex',
        flexFlow: 'column nowrap',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        height: '150px',
        overflow: 'auto',
        '& .MuiTypography-body2': {
          width: 'calc(100% - 100px)',
        },
      },
    },
    '& .stepper': {
      width: '600px',
      marginTop: '20px',
    },
  },
}));

interface IProps {
  next: () => void;
}

const Onboarding = ({ next }: IProps) => {
  const classes = useStyles();
  const [index, setIndex] = React.useState(0);

  const nextSlide = () => {
    if (index === onboardingImages.length - 1) {
      next();
    } else {
      setIndex(index + 1);
    }
  };

  const prevSlide = () => {
    setIndex(index - 1);
  };

  return (
    <div className={classes.root}>
      <Card className="card">
        <img src={onboardingImages[index]} alt="onboarding" />
        <div className="description">
          <Typography variant="h5" color="primary" gutterBottom>
            {OnboardingSlides[index].title}
          </Typography>
          <Typography variant="body2" color="textPrimary" align="center">
            {OnboardingSlides[index].description}
          </Typography>
        </div>
      </Card>
      <MobileStepper
        className="stepper"
        variant="dots"
        steps={onboardingImages.length}
        position="static"
        activeStep={index}
        nextButton={
          <Button size="small" onClick={nextSlide}>
            {index < onboardingImages.length - 1 ? 'Next' : 'Start'}
            <KeyboardArrowRight />
          </Button>
        }
        backButton={
          <Button size="small" onClick={prevSlide} disabled={index === 0}>
            <KeyboardArrowLeft />
            Back
          </Button>
        }
      />
    </div>
  );
};

Onboarding.propTypes = {
  /** Function to continue on to the next slide */
  next: PropTypes.func.isRequired,
};

export default Onboarding;
