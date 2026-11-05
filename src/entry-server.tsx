import { StrictMode } from 'react'
import { renderToString } from 'react-dom/server'
import App from './App'

export { ALL_SERVICES, BRANCHES, EMAIL, FACEBOOK, LEGAL_NAME, PHONE_PRIMARY, RUC } from './data/site'

// oxlint-disable-next-line react/only-export-components
export function render() {
  return renderToString(
    <StrictMode>
      <App />
    </StrictMode>,
  )
}
