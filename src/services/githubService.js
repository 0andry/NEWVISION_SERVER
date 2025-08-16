class GithubService {
  static async handleWebhookEvent(event, payload) {
    console.log(`Elaborazione evento: ${event}`);
    
    switch (event) {
      case 'push':
        return this.handlePushEvent(payload);
      case 'pull_request':
        return this.handlePullRequestEvent(payload);
      default:
        console.log(`Evento non gestito: ${event}`);
        return { status: 'ignored', event };
    }
  }

  static async handlePushEvent(payload) {
    const { ref, repository, commits } = payload;
    console.log(`Push ricevuto su ${ref} nel repository ${repository.full_name}`);
    return { status: 'processed', event: 'push' };
  }

  static async handlePullRequestEvent(payload) {
    const { action, pull_request } = payload;
    console.log(`Pull request ${action}: ${pull_request.html_url}`);
    return { status: 'processed', event: 'pull_request' };
  }
}

module.exports = GithubService;