import { registerApplication, start } from 'single-spa'
import * as isActive from './activity-functions'

const loadFile = nameOrPaht => {
  // eslint-disable-next-line no-undef
  return System.import(nameOrPaht)
}

const loadEntry = (manifest, bundle = 'app') => {
  const { entrypoints, publicPath } = manifest
  const assets = entrypoints[bundle].assets
  return loadFile(publicPath + assets[0])
}

const loadModule = moduleName => {
  return loadFile(moduleName)
    .then(module => module.default)
    .then(manifest => loadEntry(manifest))
}

registerApplication(
  'mf-platform',
  () => loadModule('mf-platform'),
  isActive.platform
)
registerApplication(
  'mf-application-user',
  () => loadModule('mf-application-user'),
  isActive.mfApplicationUser
)
registerApplication(
  'mf-application-customer',
  () => loadModule('mf-application-customer'),
  isActive.mfApplicationCustomer
)

// global flg
sessionStorage.setItem('mfMode', true)

start()
