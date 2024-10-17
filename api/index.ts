import axios from "axios";

export interface IGrocery  {
    id: string;
    name: string;
    amount: number;
    isBought: boolean;
}

export const fetchGroceries = async (): Promise<IGrocery[]>  => {
    try {
        const groceries = await axios.get("http://localhost:3001/groceries");
        return groceries.data;
    } catch (e) {
        throw e;
    }
}

export const createGrocery = async (name: string, amount: number) => {
    try {
        await axios.post("http://localhost:3001/groceries", { name, amount, bought: false });
    } catch (e) {
        throw e;
    }
}

export const deleteGrocery = async (id: string) => {
    try {
        await axios.delete(`http://localhost:3001/groceries/${id}`);
    } catch (e) {
        throw e;
    }
}

export const markAsBought = async (id: string, isBought: boolean) => {
    try {
        await axios.patch(`http://localhost:3001/groceries/${id}`, { isBought });
    } catch (e) {
        throw e;
    }
};

export const editGrocery = async (id: string, name: string, amount: number) => {
    try {
        await axios.patch(`http://localhost:3001/groceries/${id}`, {
            name, amount, isBought: false
        })
    } catch (e) {
        throw e;
    }
}
