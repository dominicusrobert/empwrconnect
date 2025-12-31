import * as bcrypt from 'bcrypt';

export const validatePassword = async function (hashedPassword: string, password: string) {
	const hashPassword = hashedPassword.replace(/^\$2y(.+)$/i, '$2a$1');
	return bcrypt.compareSync(password, hashPassword);
};

export const hashPassword = async function (plainPassword: string): Promise<string> {
	const hashedPassword = await bcrypt.hash(plainPassword, 0);
	return hashedPassword;
};
