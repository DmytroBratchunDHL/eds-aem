import {
  readBlockConfig,
} from '../../scripts/aem.js';

export default function decorate(block) {
  // Extract values from the given HTML structure
  
  const conf = readBlockConfig(block);
  console.log(conf);
  
  // Define additional attributes based on the target structure
  const munchkinId = cong['element-id'] || '903-EZK-832';
  const formId = cong['form-id'] || '1795';
  const formHost = cong['hostname'] || 'https://express-resource.dhl.com';
  const hiddenFormId =  cong['hidden-form-id'] || '1756';
  const action =  cong['action'] || '/discover/content/dhl/global/en-global/open-an-account.form.html';
  const formstart =  cong['form-start'] || '/discover/content/dhl/global/en-global/open-an-account/jcr:content/root/two_columns_container/right-column-body/marketoform.form.html';
  const source = cong['source'] || 'conf';
  const analyticsData = JSON.stringify({
    content: {
      attributes: {},
      name: 'Marketo Form | Open an Account',
      type: 'marketoForm',
      interaction: 'Click',
      position: 'Center',
    },
    trackedInteractions: 'basic',
    interactionType: 'dhl_utf_contentInteraction',
  });

  // Create the new structure
  const newFormContainer = document.createElement('div');
  newFormContainer.className = 'forms cmp-marketoForm';
  newFormContainer.setAttribute('formId', formId);
  newFormContainer.setAttribute('munchkinId', munchkinId);
  newFormContainer.setAttribute('formHost', formHost);
  newFormContainer.setAttribute('hiddenFormId', hiddenFormId);
  newFormContainer.setAttribute('action', action);
  newFormContainer.setAttribute('formstart', formstart);
  newFormContainer.setAttribute('source', source);
  newFormContainer.setAttribute('data-marketo-form', '');
  newFormContainer.setAttribute('data-analytics', analyticsData);

  // Create the inner structure
  const cmpContainer = document.createElement('div');
  cmpContainer.className = 'cmp-marketoForm__container';

  const formWrapper = document.createElement('div');
  formWrapper.setAttribute('data-marketo-visible-form', '');

  const formElement = document.createElement('form');
  formElement.id = `mktoForm_${formId}`;

  const scriptElement = document.createElement('script');
  scriptElement.src = `${formHost}/js/forms2/js/forms2.min.js`;

  // Append elements to form structure
  formWrapper.appendChild(formElement);
  formWrapper.appendChild(scriptElement);
  cmpContainer.appendChild(formWrapper);
  newFormContainer.appendChild(cmpContainer);

  // Replace the original block content
  block.replaceChildren(newFormContainer);
}
