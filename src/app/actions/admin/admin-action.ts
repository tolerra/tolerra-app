import axios from "axios";

export async function getDisabilityVerifications(token: string | null) {
    try {
        const url = new URL(
            `${process.env.NEXT_PUBLIC_API_BASE_URL}/admin/disability-verifications`
        );
        const response = await axios.get(url.toString(), {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data;
    } catch (error) {
        console.error("Error fetching disability verifications:", error);
        return [];
    }
}
