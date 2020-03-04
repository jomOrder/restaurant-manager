import React, { useEffect, useState } from 'react';


const AccountDetails = props => {

  const [values, setValues] = useState(props);

  useEffect(() => {

  }, []);

  return (
    <div class="tab-pane fade show active" id="pills-campaign" role="tabpanel" aria-labelledby="pills-campaign-tab">
      <div class="row">
        <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
          <div class="card">
            <h5 class="card-header">{values.name}</h5>
            <div class="card-body">
              <form>
                <div class="row">
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
};

export default AccountDetails;
