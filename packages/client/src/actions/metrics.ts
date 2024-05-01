export async function createMetric(metrin: CreateMetric) {
  "use-server";

  try {
    // const res = await supabaseClient.insert(metric)

    return {
      message: "Metric succesfully created.",
    };
  } catch (error) {
    return {
      message: "Error creating metric.",
      error,
    };
  }
}

export async function updateMetric(metrin: CreateMetric) {
  "use-server";

  try {
    // const res = await supabaseClient.insert(metric)

    return {
      message: "Metric succesfully created.",
    };
  } catch (error) {
    return {
      message: "Error creating metric.",
      error,
    };
  }
}

export async function deleteMetric(metrin: CreateMetric) {
  "use-server";

  try {
    // const res = await supabaseClient.insert(metric)

    return {
      message: "Metric succesfully created.",
    };
  } catch (error) {
    return {
      message: "Error creating metric.",
      error,
    };
  }
}
