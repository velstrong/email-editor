import { NewItem, Preview } from './Preview';
import './List.scss';
import { useGetTemplatesQuery } from '../../Api/api';
import { Grid, Skeleton } from '@mui/material';
import {Scrollbars} from 'react-custom-scrollbars-2';
import GiteOutlinedIcon from '@mui/icons-material/GiteOutlined';

const List = () => {
  const { data, isLoading, isError, isSuccess } = useGetTemplatesQuery();

  return (
    <Scrollbars style={{ height: '100%' }}>
      <div className="template">
        <Grid container alignItems="middle" justifyContent="center" className="header">
          <Grid item xs={24}>
            <Grid container alignItems="middle" justifyContent="center">
              <Grid item>
                <span className="title">Dnde</span>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={24}>
            <Grid container alignItems="middle" justifyContent="center">
              <Grid item style={{ textAlign: 'center' }}>
                <span className="subtitle">
                  Drag and Drop Editor tailored for <b>Mails</b>
                </span>
              </Grid>
            </Grid>
          </Grid>
          <Grid item style={{ paddingTop: '24px' }} xs={24}>
            <Grid container alignItems="middle" justifyContent="center">
              <Grid item className="info" md={24} lg={10} style={{ textAlign: 'center' }}>
                <span>
                  All features are optimised for mails, work flexibly through import/export, with responsive design for
                  all devices.
                </span>
                <br />

                <a target="_blank" href="https://github.com/aghontpi/dnde">
                  <span>
                    Check it on Github <GiteOutlinedIcon style={{ position: 'relative', top: '4px', fontSize: '32px' }} />
                  </span>
                </a>
              </Grid>
            </Grid>
          </Grid>
        </Grid>

        <Grid container className="choose-template" alignItems="middle" justifyContent="center">
          <Grid item xs={16}>
            <span className="title">Choose a template and get started.</span>
          </Grid>
          <Grid item xs={16}>
            <span className="subtitle">All templates are redesigned in dnde, using original mail as reference.</span>
          </Grid>
        </Grid>

        <Grid container justifyContent="center" className="template-list">
          <Grid item lg={6}>
            <NewItem />
          </Grid>
          {isLoading &&
            [1, 2].map((item, key) => {
              return (
                <Grid key={key} item xs={24} md={12} lg={6} style={{ textAlign: 'center' }}>
                  <Preview
                    key={key}
                    id={'8x93dummy'}
                    skeleton={
                      <>
                        <Skeleton active={true} />
                        <Skeleton active={true} />
                      </>
                    }
                  />
                </Grid>
              );
            })}
          {isSuccess && data
            ? data.response.map((item, key) => {
                return (
                  <Grid item lg={6}>
                    <Preview key={key} id={item.docRef} image={item.preview} />
                  </Grid>
                );
              })
            : null}
        </Grid>
      </div>
    </Scrollbars>
  );
};

export { List };
