export const formatSQLAddress = ({dialect, user, password, host, port, dbname}) => [
	dbname,
	user,
	password,
	{
		host,
		port,
		dialect,
		define: {
			charset: "utf8",
			collate: "utf8_general_ci"
		}
	}
];