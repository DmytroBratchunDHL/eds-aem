import {
  readBlockConfig
} from '../../scripts/aem.js';

export default function decorate(block) {
  // Extract values from the given HTML structure
  const munchkinId = block.children[1]?.querySelector('p')?.textContent.trim() || '';
  const formId = block.children[2]?.querySelector('p')?.textContent.trim() || '';
  const formHost = block.children[4]?.querySelector('a')?.getAttribute('href') || '';

  const conf = readBlockConfig(block);

  // Define additional attributes based on the target structure
  const hiddenFormId = '1756';
  const action = '/discover/content/dhl/global/en-global/open-an-account.form.html';
  const formstart = '/discover/content/dhl/global/en-global/open-an-account/jcr:content/root/two_columns_container/right-column-body/marketoform.form.html';
  const source = 'conf';
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
