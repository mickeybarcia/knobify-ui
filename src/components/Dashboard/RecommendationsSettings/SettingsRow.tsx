import React from 'react';
import { Field } from 'formik';

type Props = {
  setting: string;
  settingLabel: string;
  isCheckBox?: boolean;
};

const SettingsRow: React.FC<Props> = ({ setting, settingLabel, isCheckBox }) => {
  return (
    <div className="form-group row m-2">
      <label htmlFor={setting} className="col-sm-8 col-form-label">
        {settingLabel}
      </label>
      {!isCheckBox && (
        <div className="col-sm-4">
          <Field name={setting} type="text" className="form-control" />
        </div>
      )}

      {isCheckBox && (
        <div className="d-flex align-items-center col-sm-1">
          <Field name={setting} type="checkbox" />
        </div>
      )}
    </div>
  );
};

export default SettingsRow;
