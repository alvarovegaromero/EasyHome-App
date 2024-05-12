export type User = {
    id: number;
    is_owner: boolean;
    username: string;
};

export type Group = {  
    id: string;
    name: string;
    description: string;
    currency: string;
    creation_date: string;
    owner: string; //owner username
};
