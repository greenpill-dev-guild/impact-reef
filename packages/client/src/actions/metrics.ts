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

export async function deprecateMetric(metrin: CreateMetric) {
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
