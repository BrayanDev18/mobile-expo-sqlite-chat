export interface UserResponse {
  results: UserProps[];
  info: {
    seed: string;
    results: number;
    page: number;
    version: string;
  };
}

export interface UserProps {
  gender: "male" | "female";
  name: {
    first: string;
    last: string;
  };
  location: {
    street: {
      number: number;
      name: string;
    };
    city: string;
    state: string;
    country: string;
    postcode: string | number;
    coordinates: {
      latitude: string;
      longitude: string;
    };
    timezone: {
      offset: string;
      description: string;
    };
  };
  email: string;
  registered: {
    date: string;
    age: number;
  };
  login: {
    uuid: string;
    username: string;
  };
  phone: string;
  cell: string;
  picture: {
    large: string;
  };
}
