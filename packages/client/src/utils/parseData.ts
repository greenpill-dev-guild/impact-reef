export const fetchMetadata = async (metadataUrl: string) => {
  const response = await fetch(metadataUrl);
  const data = await response.json();
  return data;
};

export const parseDataToProjectItem = async (data: any) => {
  const _data = JSON.parse(data);
  const metadata = await fetchMetadata(
    _data.filter((d: any) => d.name === "metadataUrl")[0].value.value!
  );

  return {
    id: _data.filter((d: any) => d.name === "projectRefUID")[0]["value"]
      .value,
    title: _data.filter((d: any) => d.name === "name")[0].value.value!,
    category: _data.filter((d: any) => d.name === "category")[0].value.value!,
    avatar_image: metadata.projectAvatarUrl,
    updated_at: new Date().toISOString(),
  };
};

export const parseDataToProjectMetric = async (data: any) => {
  const _data = JSON.parse(data);
  const metadata = await fetchMetadata(
    _data.filter((d: any) => d.name === "metadataUrl")[0].value.value!
  );

  return {
    id: _data.filter((d: any) => d.name === "projectRefUID")[0]["value"]
      .value,
    title: _data.filter((d: any) => d.name === "name")[0].value.value!,
    category: _data.filter((d: any) => d.name === "category")[0].value.value!,
    avatar_image: metadata.projectAvatarUrl,
    updated_at: new Date().toISOString(),
  };
};

export const parseDataToEndorsementItem = async (data: any) => {
  const _data = JSON.parse(data);
  const metadata = await fetchMetadata(
    _data.filter((d: any) => d.name === "metadataUrl")[0].value.value!
  );

  return {
    id: _data.filter((d: any) => d.name === "projectRefUID")[0]["value"]
      .value,
    title: _data.filter((d: any) => d.name === "name")[0].value.value!,
    category: _data.filter((d: any) => d.name === "category")[0].value.value!,
    avatar_image: metadata.projectAvatarUrl,
    updated_at: new Date().toISOString(),
  };
};



