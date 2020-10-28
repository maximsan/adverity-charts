export interface FilterType {
  [name: string]: string[];
}

export enum FilterKey {
  DATA_SOURCE = 'dataSource',
  CAMPAIGN = 'campaign',
  CLICKS = 'clicks',
  IMPRESSIONS = 'impressions',
}
