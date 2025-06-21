// This is a mock service. In a real application, these functions would
// make API calls to your backend server.

// Mock user database
const mockUsers = [
    {
        id: '1',
        email: 'user@example.com',
        // In a real DB, this would be a bcrypt hash
        password: 'password123',
        name: 'Test User',
        profile: {
            bio: 'A developer trying to stay mindful.'
        }
    }
];

class AuthService {
    private static instance: AuthService;

    private constructor() {}

    public static getInstance(): AuthService {
        if (!AuthService.instance) {
            AuthService.instance = new AuthService();
        }
        return AuthService.instance;
    }

    async signUp(email: string, password: string, name?: string) {
        console.log("MOCK API: Signing up user", { email, name });
        const existingUser = mockUsers.find(u => u.email === email);

        if (existingUser) {
            throw new Error('User already exists');
        }

        const newUser = {
            id: (mockUsers.length + 1).toString(),
            email,
            password, // Storing plain text for mock service
            name: name || 'New User',
            profile: { bio: '' }
        };
        mockUsers.push(newUser);
        
        const token = this.generateToken(newUser.id);
        return { user: { id: newUser.id, email: newUser.email, name: newUser.name }, token };
    }

    async signIn(email: string, password: string) {
        console.log("MOCK API: Signing in user", { email });
        const user = mockUsers.find(u => u.email === email);

        if (!user || user.password !== password) {
            throw new Error('Invalid credentials');
        }

        const token = this.generateToken(user.id);
        return { user: { id: user.id, email: user.email, name: user.name }, token };
    }

    async signOut() {
        console.log("MOCK API: Signing out");
        // Client-side will handle token removal
        return true;
    }

    async getCurrentUser(userId: string) {
        console.log(`MOCK API: Getting user ${userId}`);
        const user = mockUsers.find(u => u.id === userId);
        if (!user) return null;
        // Return a subset of user data, similar to a real API response
        return {
            id: user.id,
            email: user.email,
            name: user.name,
            profile: user.profile
        };
    }

    private generateToken(userId: string): string {
        const payload = JSON.stringify({ userId, exp: Date.now() + 1000 * 60 * 60 * 24 * 7 });
        // Using btoa as a simple, browser-safe way to encode the token
        return `mock-header.${btoa(payload)}.mock-signature`;
    }

    verifyToken(token: string): { userId: string } {
        try {
            const payload = token.split('.')[1];
            if (!payload) throw new Error('Invalid token');
            const decoded = JSON.parse(atob(payload));
            if (decoded.exp < Date.now()) {
                throw new Error('Token expired');
            }
            return { userId: decoded.userId };
        } catch (error) {
            console.error("Token verification failed", error);
            throw new Error('Invalid token');
        }
    }
}

export const authService = AuthService.getInstance(); 