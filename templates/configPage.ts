/**
 * Shared templates for the configuration page
 *
 * This file contains HTML templates that can be used by Cloudflare and future implementations.
 * It serves as an integration point for the smaller, more maintainable component files.
 */
import { getMDBListSearchFormHTML } from './mdblistTemplates';
import { getConfigPageHeaderHTML } from './configPageHeader';
import { getAddCatalogFormHTML } from './addCatalogComponent';
import { getMDBListApiConfigHTML } from './mdblistComponent';
import { getCatalogListHTML } from './catalogListComponent';
import { getAddonInstallationHTML } from './addonInstallComponent';
import { getSponsorBannerHTML } from './sponsorComponent';
import { getFooterHTML } from './footerComponent';
import { getPageScriptsHTML } from './pageScriptsComponent';
import { getHTMLHead, getBodyOpeningHTML, getBodyClosingHTML } from './pageStructureComponents';
import { getHomePageHTML } from './homePageTemplate';
export { convertStremioUrl } from './utilities';

/**
 * Creates the HTML for the configuration page
 */
export function getConfigPageHTML(
  userId: string,
  catalogs: any[],
  baseUrl: string,
  message: string = '',
  error: string = '',
  isCloudflare: boolean = false,
  packageVersion: string = '1.0.0',
  apiKey: string = ''
) {
  // Add MDBList search form if API key is available
  const mdblistSearchForm = apiKey ? getMDBListSearchFormHTML(userId) : '';

  // Build the page by combining the components
  return `
    ${getHTMLHead('AIOCatalogs - Configuration')}
    ${getBodyOpeningHTML(userId)}
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      ${getConfigPageHeaderHTML(userId)}
      ${getSponsorBannerHTML()}
      
      <div class="grid gap-8 md:grid-cols-12">
        <div class="md:col-span-12 lg:col-span-8 space-y-6">
          ${getAddCatalogFormHTML(userId)}
          ${getCatalogListHTML(userId, catalogs)}
        </div>
        <div class="md:col-span-12 lg:col-span-4 space-y-6">
          ${getMDBListApiConfigHTML(userId, apiKey)}
          ${mdblistSearchForm}
          ${getAddonInstallationHTML(userId, baseUrl)}
        </div>
      </div>
      
      ${getFooterHTML(packageVersion)}
      ${getPageScriptsHTML(message, error)}
    </div>
    ${getBodyClosingHTML()}
  `;
}

// Re-export the home page HTML function
export { getHomePageHTML };
