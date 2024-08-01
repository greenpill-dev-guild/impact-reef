export const fetchMetadata = async (metadataUrl: string) => {
  const response = await fetch(metadataUrl);
  const data = await response.json();
  return data;
};

export const parseDataToProjectItem = async (
  data: any
): Promise<ProjectItem> => {
  const _data = JSON.parse(data);
  const metadata = await fetchMetadata(
    _data.filter((d: any) => d.name === "metadataUrl")[0].value.value!
  );

  return {
    id: _data.filter((d: any) => d.name === "projectRefUID")[0]["value"].value,
    title: _data.filter((d: any) => d.name === "name")[0].value.value!,
    category: _data.filter((d: any) => d.name === "category")[0].value.value!,
    avatar_image: metadata.projectAvatarUrl,
    creator: "", // Todo get creator
    updated_at: new Date().toISOString(),
  };
};

export const parseDataToProjectMetric = (
  id: string,
  recipient: string,
  data: any
): ProjectMetricItem => {
  const _data = JSON.parse(data);

  return {
    id,
    metricUID: _data.filter((d: any) => d.name === "metricUID")[0].value.value!,
    projectUID: _data.filter((d: any) => d.name === "projectUID")[0].value
      .value!,
    source: _data.filter((d: any) => d.name === "source")[0].value.value!,
    value: _data.filter((d: any) => d.name === "value")[0].value.value!,
    recipient,
    created_at: new Date().toISOString(),
  };
};

export const parseDataToEndorsementItem = (
  id: string,
  attester: string,
  data: any
): Endorsement => {
  const _data = JSON.parse(data);

  return {
    id,
    metricUID: _data.filter((d: any) => d.name === "metricUID")[0].value.value!,
    projectUID: _data.filter((d: any) => d.name === "projectUID")[0].value
      .value!,
    attester,
    description: _data.filter((d: any) => d.name === "description")[0].value
      .value!,
    created_at: new Date().toISOString(),
  };
};
