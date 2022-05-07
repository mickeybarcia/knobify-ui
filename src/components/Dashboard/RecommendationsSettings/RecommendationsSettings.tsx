import React from 'react';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';

import { RecommendationsQuerySettings } from '../../../types';
import SettingsRow from './SettingsRow';

type Props = {
  onChangeSettings: (settings: RecommendationsQuerySettings) => void;
  settings: RecommendationsQuerySettings;
};

// TODO - refactor
const zeroToOneFieldValidation = Yup.number().min(0).max(1).required();
const validation = Yup.object().shape({
  min_energy: zeroToOneFieldValidation,
  max_energy: zeroToOneFieldValidation,
  min_acousticness: zeroToOneFieldValidation,
  max_acousticness: zeroToOneFieldValidation,
  min_danceability: zeroToOneFieldValidation,
  max_danceability: zeroToOneFieldValidation,
  min_instrumentalness: zeroToOneFieldValidation,
  max_instrumentalness: zeroToOneFieldValidation,
  excludeLiked: Yup.boolean().required()
});

const RecommendationsSettings: React.FC<Props> = ({ onChangeSettings, settings }) => {
  const initialValues = {
    min_energy: settings.min_energy || 0,
    max_energy: settings.max_energy || 1,
    min_acousticness: settings.min_acousticness || 0,
    max_acousticness: settings.max_acousticness || 1,
    min_danceability: settings.min_energy || 0,
    max_danceability: settings.max_energy || 1,
    min_instrumentalness: settings.min_instrumentalness || 0,
    max_instrumentalness: settings.max_instrumentalness || 1,
    excludeLiked: settings.excludeLiked || false
  };

  const handleChangeSettings = async (formValue: RecommendationsQuerySettings) => {
    onChangeSettings(formValue);
  };

  return (
    <div className="card card-container">
      <div className="p-3">
        <div>song settings</div>
        <Formik
          initialValues={initialValues}
          validationSchema={validation}
          onSubmit={handleChangeSettings}>
          {(formik) => (
            <Form>
              <small className="text-muted">set between 0 and 1</small>
              <SettingsRow setting={'min_energy'} settingLabel={'min energy'} />
              <SettingsRow setting={'max_energy'} settingLabel={'max energy'} />
              <SettingsRow setting={'min_acousticness'} settingLabel={'min acousticness'} />
              <SettingsRow setting={'max_acousticness'} settingLabel={'max acousticness'} />
              <SettingsRow setting={'min_danceability'} settingLabel={'min danceability'} />
              <SettingsRow setting={'max_danceability'} settingLabel={'max danceability'} />
              <SettingsRow setting={'min_instrumentalness'} settingLabel={'min instrumentalness'} />
              <SettingsRow setting={'max_instrumentalness'} settingLabel={'max instrumentalness'} />
              <br />

              <small className="text-muted">filter results</small>
              <SettingsRow
                setting={'excludeLiked'}
                settingLabel={'exclude liked songs'}
                isCheckBox={true}
              />
              <br />

              <div className="form-group">
                <button
                  type="submit"
                  className="btn-sm"
                  disabled={formik.isSubmitting || !formik.isValid}>
                  change settings
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default RecommendationsSettings;
