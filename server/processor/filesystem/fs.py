import psutil


def get_partitions_and_capacities():
    responses = []
    for i in psutil.disk_partitions():
        usage = psutil.disk_usage(i.device)
        responses.append(
            {
                i.device: {
                    "total": usage.total,
                    "used": usage.used,
                    "free": usage.free,
                    "percent": usage.percent,
                }
            }
        )
    return responses

