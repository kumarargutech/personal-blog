import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import StepContent from '@material-ui/core/StepContent';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import GetExperience from './GetExperience';
import Loader from './Loader';

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    marginTop: 200
  },
  button: {
    marginTop: theme.spacing(1),
    marginRight: theme.spacing(1),
  },
  actionsContainer: {
    marginBottom: theme.spacing(2),
  },
  resetContainer: {
    padding: theme.spacing(3),
  },
}));

export default function Experience() {
  const URLPath = "/api/experiences";
  const classes = useStyles();
  const [activeStep, setActiveStep] = React.useState(0);
  const [loaderStatus, setLoaderStatus] = useState(true);
  const [experience, setExperience] = useState();

  useEffect(() => {
    const FetchData = async () => {
      const res = await fetch(URLPath);
      const json = await res.json();
      setExperience(json);
      setLoaderStatus(false);
    };
    FetchData();
  }, [URLPath]);

  const handleNext = () => {
    setActiveStep(prevActiveStep => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep(prevActiveStep => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  if(loaderStatus) {
    return <Loader />
  }

  return (
    <div className={classes.root}>
      {experience && <Container maxWidth="md">
        <Stepper activeStep={activeStep} orientation="vertical">
          {experience.map((item, index) => (
            <Step key={index}>
              <StepLabel></StepLabel>
              <StepContent>
                <Typography><GetExperience experienceInfo={item} /></Typography>
                <div className={classes.actionsContainer}>
                  <div>
                    <Button
                      disabled={activeStep === 0}
                      onClick={handleBack}
                      className={classes.button}
                    >
                      Back
                  </Button>
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={handleNext}
                      className={classes.button}
                    >
                      {activeStep === experience.length - 1 ? 'Finish' : 'Next'}
                    </Button>
                  </div>
                </div>
              </StepContent>
            </Step>
          ))}
        </Stepper>
        {activeStep === experience.length && (
          <Paper square elevation={0} className={classes.resetContainer}>
            <Typography>Now Look for New !!!</Typography>
            <Button onClick={handleReset} className={classes.button}>
              Reset
          </Button>
          </Paper>
        )}
      </Container>}
    </div>
  );
}
